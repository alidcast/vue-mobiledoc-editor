export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function camelize(str) {
  return str.replace(/\W+(.)/g, function (match, chr) {
    return chr.toUpperCase()
  })
}

export default function (str) {
  return capitalize(camelize(str))
}
