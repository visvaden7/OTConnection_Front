export const getCommentTime = (commentTime: string) => {
  const timeDiff = Date.now() - new Date(commentTime).getTime();
  const seconds = Math.floor(timeDiff / 1000); // 밀리초를 초로 변환
  const minutes = Math.floor(seconds / 60); // 초를 분으로 변환
  const hours = Math.floor(minutes / 60); // 분을 시간으로 변환
  const days = Math.floor(hours / 24); // 시간을 일로 변환
  
  if (days > 0) {
    return `${days}일 전`
  } else if (hours > 0) {
    return `${hours}시간 전`
  } else if (minutes > 0) {
    return `${minutes}분 전`
  } else {
    return `${seconds}초 전`
  }
}