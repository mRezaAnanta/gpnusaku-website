interface CardProps {
    title: string;
    description: string;
    timestamp: string;
}

const CardProduct: CardProps = ({ title, description, timestamp}) => {
    return (
        <div className="flex flex-col gap-2 min-h-48 bg-gradient-to-b from-white via-white to-light-green rounded-lg p-6 shadow-xs hover:shadow-2xl transform duration-200 ease-in-out hover:-translate-y-0.5 hover:border-dark-green">
            <h3 className="font-poppins text-dark-green font-bold text-xl">{title}</h3>
            <p className="font-nunito text-sm text-start">{description}</p>
            <span className="font-nunito text-xs text-gray-500 text-start">Ditambahkan: {timestamp}</span>
        </div>
    )
}

export default CardProduct
