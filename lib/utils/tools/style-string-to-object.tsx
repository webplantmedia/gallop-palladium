export function styleStringToObject(style: string) {
  var regex = /([\w-]*)\s*:\s*([^;]*)/g;
  var match: any,
    properties = {};
  while ((match = regex.exec(style))) properties[match[1]] = match[2].trim();

  return properties;
}
