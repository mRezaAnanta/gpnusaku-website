interface CardImgProps {
    src: string;
    caption?: string;
    width?: string;
    height?: string;
}

const CardImg: CardImgProps = ({src, caption, width, height}) => {
    return (
        <div className={`relative flex-1 ${width || "lg:max-w-1/2"} ${height || "h-full"} overflow-hidden`}>
            <img src={src} className="rounded-lg w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg" />
            <p className="absolute bottom-4 left-4 text-white text-sm drop-shadow-lg">
                {caption}
            </p>
        </div>
    )
}

export default CardImg
