import Image from 'next/image';

const ProfilePic = ({ src, width, height }) => {
  return (
    <Image
      className="rounded-circle"
      src={src}
      width={width}
      height={height}
      objectFit="cover"
      style={{ objectFit: 'cover' }}
    />
  );
};

ProfilePic.defaultProps = {
  src: '/images/avatar.png',
  width: 40,
  height: 40,
};

export default ProfilePic;
