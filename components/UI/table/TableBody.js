import { shorten } from '@/lib/string';
import { isObject, isNumber, isString } from '@/lib/types';
import { skipKeyByValue } from '@/lib/objects';

const uuid = (n) => Math.random().toFixed(n).toString() + Date.now().toString();

export const objectsToTable = (objs, skip = ['blank'], maxChars = 40) => {
  const rows = [];
  let idx = 0;
  for (let obj of objs) {
    const row = (
      <tr key={uuid(6)}>
        <td>#</td>
        {Object.values(obj).map(
          (value, idx) =>
            !isObject(value) &&
            (isString(value) && !skipKeyByValue(obj, value, skip) ? (
              <td title={value} key={uuid(6)}>
                {shorten(value, maxChars)}
              </td>
            ) : (
              isNumber(value) &&
              !skipKeyByValue(obj, value, skip) && <td key={uuid(6)}>{value}</td>
            ))
        )}
      </tr>
    );
    idx++;
    rows.push(row);
  }

  return rows;
};
