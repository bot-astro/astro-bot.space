export default function <T>(source: T): T {
  return JSON.parse(JSON.stringify(source))
}
