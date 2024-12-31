// Define the component
const ImageWithText = ({ image, title, description, layout }) => {
    const layoutStyles = {
        'image-left-text-right': { display: 'flex', flexDirection: 'row', alignItems: 'center' },
        'image-right-text-left': { display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' },
        'image-top-text-below': { textAlign: 'center', flexDirection: 'column' },
    };

    return (
        <div style={{ padding: '20px', ...layoutStyles[layout] }}>
            {image && <img src={image} alt={title} style={{ maxWidth: '50%', margin: '10px', borderRadius: '8px' }} />}
            <div style={{ maxWidth: '50%', margin: '10px' }}>
                <h2 style={{ margin: '10px 0' }}>{title}</h2>
                <p style={{ color: '#555' }}>{description}</p>
            </div>
        </div>
    );
};

export default ImageWithText