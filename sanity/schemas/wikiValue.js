import { FaWikipediaW as icon } from 'react-icons/fa';

export default {
    name: 'wikiValue',
    title: 'Wiki Value',
    type: 'document',
    icon,
    fields: [
        {
            name: 'value',
            title: 'Value',
            type: 'string',
            description: 'Ie Harris Lee Wittels, Oklahoma City, Emerson College, etc.',
        },
        {
            name: 'link',
            title: 'Link',
            type: 'string',
        },
    ],
    preview: {
        select: {
            value: 'value',
        },
        prepare: ({ value }) => {
            const valueStr = value.length > 35 ? `${value.slice(0,35)}...` : value;
            return {
               title: valueStr,
            }
        }
    }
}