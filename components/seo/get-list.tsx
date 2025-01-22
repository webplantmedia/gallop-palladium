import { objectMap } from '@utils/objectMap';

export default function GetList(vars: any) {
  let schema: any = {};
  let list: any = [];

  objectMap(vars?.wpBlockList, async (key, item, index) => {
    if (!Object.keys(item).includes('wpBlockList')) {
      schema[item._text.split(': ')[0]] = item._text.split(': ')[1];
    } else {
      let address: any = {};
      objectMap(item?.wpBlockList, async (key2, item2, index2) => {
        address[item2._text.split(': ')[0]] = item2._text.split(': ')[1];
      });
      list.push(address);
    }
  });

  if (list.length > 0) schema['list'] = list;

  return schema;
}
