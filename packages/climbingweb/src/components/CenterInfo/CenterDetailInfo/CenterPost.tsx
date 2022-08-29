import { ImageGridList } from '../../common/ImageList/ImageGridList';


export const CenterPost = ({ }) => {
    const img = 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
    const list = [img, img, img, img, img, img, img, img, img, img, img, img, img, img];
    return (
        <div>
            <ImageGridList imageList={list} />
        </div>
    );
};