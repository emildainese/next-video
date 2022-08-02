import { useState, useEffect } from 'react';
import Fade from '@/components/animations/Fade';
import BaseModal from '@/components/UI/modal/BaseModal';
import BaseTable from '@/components/UI/table/BaseTable';
import db from '@/db/models/index.mjs';
import { serialize } from '@/lib/util';
import { getSession } from 'next-auth/client';
import { Container, Row, Col } from 'react-bootstrap';
import { splitUpper, ucfirst } from '@/lib/string';
import { skipKey } from '@/lib/objects';
import { pipe } from '@/lib/functional';
import { objectsToTable } from '@/components/UI/table/TableBody';

const omitNotificationData = ['batchId', 'assetId']

const omitVideoData = ['assetId', 'publicId']

const Dashboard = ({ notifications, videos, err }) => {
  const [error, setError] = useState(err);

  useEffect(() => {
    if (
      !notifications ||
      notifications.length === 0 ||
      !videos ||
      videos.length === 0
    ) {
      return;
    }
    document.body.style.overflowY = 'visible';
  }, [notifications]);

  let notificationHeaders = [];
  let notificationBody = [];
  if (notifications && notifications.length > 0) {
    notificationHeaders = pipe(skipKey(omitNotificationData), splitUpper, ucfirst)(notifications);
    notificationBody = objectsToTable(notifications, omitNotificationData);

  }

  let videoHeaders = [];
  let videoBody = [];
  if (videos && videos.length > 0) {
    videoHeaders = pipe(skipKey(omitVideoData), splitUpper, ucfirst)(videos);
    videoBody = objectsToTable(videos, omitVideoData);
  }



  return (
    <Fade>
      {error && (
        <BaseModal
          show={!!error}
          variant="danger"
          title="Sorry! Something went wrong!"
          onHide={() => setError(null)}
        >
          {error}
        </BaseModal>
      )}
      <Container fluid>
        <Row className="mb-3">
          <h2>Notifications</h2>
          <Col>
            {notifications && notifications.length > 0 ? (
              <BaseTable headers={notificationHeaders}>
                {notificationBody}
              </BaseTable>
            ) : (
              <h2 className="text-danger text-center">
                No notifications available
              </h2>
            )}
          </Col>
        </Row>
        <Row>
          <h2>Uploaded Videos</h2>
          <Col>
            {videos && videos.length > 0 ? (
              <BaseTable headers={videoHeaders}>
                {videoBody}
              </BaseTable>
            ) : (
              <h2 className="text-danger text-center">No videos available</h2>
            )}
          </Col>
        </Row>
      </Container>
    </Fade>
  );
};

export default Dashboard;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  const { email, name } = session.user;

  const user = await db.User.findOne({
    where: { username: name, email },
    raw: true,
  });

  if (!user) {
    return {
      props: {
        err: 'Error: Internal server error;.',
      },
    };
  }

  const [notifications, videos] = await Promise.all([
    db.Notification.findAll({
      where: { userId: user.id },
      limit: 10,
      order: [['createdAt', 'DESC']],
      raw: true,
      attributes: [
        'notificationType',
        'batchId',
        'assetId',
        'publicId',
        'url',
        'secureUrl',
        'createdAt',
      ],
    }),
    db.Video.findAll({
      where: { userId: user.id },
      limit: 10,
      order: [['createdAt', 'DESC']],
      raw: true,
      attributes: [
        'title',
        'description',
        'originalFileName',
        'privacy',
        'duration',
        'format',
        'fileSize',
        'batchId',
        'assetId',
        'publicId',
        'url',
        'createdAt',
      ],
    }),
  ]);

  return {
    props: {
      notifications: serialize(notifications),
      videos: serialize(videos),
    },
  };
}

