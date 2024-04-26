export const userIdToColorIdx = (userId: number) => {
  const myId = userId.toString()
  const myIdArr = myId.split('').map((el) => +el)
  const sum = myIdArr.reduce((acc, el) => acc + el, 0)
  const value = +sum.toString()[0]
  //컬러 객체가 5개이기 때문에 idx 0~4까지만 나오게 구현
  const myIdx = value > 4 ? value % 5 : value

  return myIdx
}
