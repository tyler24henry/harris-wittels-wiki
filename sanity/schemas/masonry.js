import { GiStoneWall as icon } from 'react-icons/gi';

export default {
    name: 'masonry',
    title: 'Masonry Items',
    type: 'document',
    icon,
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            }
        },
        {
            name: 'quote',
            title: 'Quote',
            type: 'string',
            description: 'Only include one or the other...',
        },
    ],
    preview: {
        select: {
            image: 'image',
            quote: 'quote',
        },
        prepare: ({ image, quote }) => {
            return {
                title: quote ? quote : 'Img only',
                media: image ? image : icon,
            }
        }
    }
}