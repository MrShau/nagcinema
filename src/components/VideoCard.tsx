//https://vkvd488.mycdn.me/?srcIp=83.169.197.14&expires=1723420089490&srcAg=CHROME_YA&fromCache=1&ms=45.136.22.188&type=1&subId=6763560307273&sig=liH1yUBnmE0&ct=19&urls=45.136.21.200&clientType=13&appId=512000384397&id=6760631437897
//<iframe src="https://vk.com/video_ext.php?oid=-209976560&id=456240008&hash=ffd8454b8b87c846" width="640" height="360" frameborder="0" allowfullscreen="1" allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>
import { Link } from 'react-router-dom'
import './VideoCard.css'

export default function VideoCard({id, title, preview, duration} : {id: number, title: string, preview: string, duration: number | null}) {
    return (
        <div className="w-100 overflow-hidden m-0 p-0 shadow" style={{height: "270px"}}>
            <Link to={`/watch/${id}`}>
            <div className="video-image-block">
                <img className="cursor-pointer w-100" style={{objectFit: "cover", height: "240px", filter: "blur(0.5px) grayscale(20%)" }} src={preview} title={title} alt={title}/>
            </div>
            </Link>
            <p className="my-2 cursor-pointer" style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
            }}>{title}</p>
        </div>
    )
}