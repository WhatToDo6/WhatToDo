export const changeUserIdToColorIdx = (userId: number) => {
  const myId = userId.toString()
  const myIdArr = myId.split('').map((el) => +el)
  const sum = myIdArr.reduce((acc, el) => acc + el, 0)
  const value = +sum.toString()[0]

  const myIdx = value > 4 ? value % 5 : value

  return myIdx
}
