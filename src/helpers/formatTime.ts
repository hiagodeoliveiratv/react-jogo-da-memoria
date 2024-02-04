export const formatTime = (seconds: number)=>{

    let minutes = Math.floor(seconds / 60);
    seconds -=(minutes * 60);

    return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;

}