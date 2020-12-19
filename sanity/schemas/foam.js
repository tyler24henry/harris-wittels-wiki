import { GiBigWave as icon } from 'react-icons/gi';

export default {
    name: 'foam',
    title: 'Foam',
    type: 'document',
    icon,
    fields: [
        {
            name: 'content',
            title: 'Content',
            type: 'text',
        },
    ],
    preview: {
        select: {
            content: 'content',
        },
        prepare: ({ content }) => {
            const title = content.length > 35 ? `${content.slice(0,35)}...` : content;
            return {
                title,
            }
        }
    }
}