interface ImagePreviewProps {
    fileLink: string | null;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ fileLink }) => {
    return (
        <div>
            {fileLink ? (
                <img src={fileLink} alt="" style={{ width: '30px', height: '30px' }} />
            ) : (
                <span>No preview available</span>
            )}
        </div>
    );
};

export default ImagePreview;
