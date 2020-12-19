import { AiFillInstagram as icon } from 'react-icons/ai';

export default {
    name: 'harrisImage',
    title: 'Harris Image',
    type: 'document',
    icon,
    fields: [
        {
            name: 'month',
            title: 'Month',
            type: 'string',
        },
        {
            name: 'day',
            title: 'Day',
            type: 'number',
        },
        {
            name: 'year',
            title: 'Year',
            type: 'number',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            }
        },
        {
            name: 'caption',
            title: 'Caption',
            type: 'string',
        },
        {
            name: 'link',
            title: 'Link',
            type: 'string',
            description: 'Link to where image came from',
        },
    ],
    preview: {
        select: {
            image: 'image',
            caption: 'caption'
        },
        prepare: ({ image, caption }) => {
            const title = caption.length > 35 ? `${caption.slice(0,35)}...` : caption;
            return {
                title,
                media: image,
            }
        }
    }
}