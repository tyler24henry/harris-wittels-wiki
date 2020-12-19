import { RiEmotionSadLine as icon } from 'react-icons/ri';

export default {
    name: 'tribute',
    title: 'Tributes',
    type: 'document',
    icon,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'What shows up on the page',
        },
        {
            name: 'link',
            title: 'Link',
            type: 'string',
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare: ({ title, thumbnail }) => {
            const titleStr = title.length > 35 ? `${title.slice(0,35)}...` : title;
            return {
                title: titleStr,
            }
        }
    }
}