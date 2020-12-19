import { AiFillYoutube as icon } from 'react-icons/ai';

export default {
    name: 'bit',
    title: 'Bits',
    type: 'document',
    icon,
    fields: [
        {
            name: 'title',
            title: 'Youtube video title',
            type: 'string',
        },
        {
            name: 'thumbnail',
            title: 'Youtube video thumbnail',
            type: 'image',
            options: {
                hotspot: true,
            }
        },
        {
            name: 'youtubeUrl',
            title: 'Youtube URL',
            type: 'string',
        },
    ],
    preview: {
        select: {
            title: 'title',
            thumbnail: 'thumbnail',
        },
        prepare: ({ title, thumbnail }) => {
            const titleStr = title.length > 35 ? `${title.slice(0,35)}...` : title;
            return {
                title: titleStr,
                media: thumbnail,
            }
        }
    }
}