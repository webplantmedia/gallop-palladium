import { objectMap } from '@utils/objectMap';

export default function GetAddressList(vars: any) {
  let addressSchema: any = {};
  let addressList: any = [];

  objectMap(vars?.wpBlockList, async (key, item, index) => {
    if (!Object.keys(item).includes('wpBlockList')) {
      addressSchema[item._text.split(': ')[0]] = item._text.split(': ')[1];
    } else {
      let address: any = {};
      objectMap(item?.wpBlockList, async (key2, item2, index2) => {
        address[item2._text.split(': ')[0]] = item2._text.split(': ')[1];
      });
      addressList.push(address);
    }
  });

  addressSchema['addressList'] = addressList;

  return addressSchema;
}
