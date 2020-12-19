import { FaWikipediaW as icon } from 'react-icons/fa';

export default {
    name: 'wiki',
    title: 'Wiki',
    type: 'document',
    icon,
    fields: [
        {
            name: 'descriptor',
            title: 'Descriptor',
            type: 'string',
            description: 'Ie full name, born, alma mater, etc.',
        },
        {
            name: 'values',
            title: 'Value(s)',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'wikiValue' }]}],
            description: 'Ie Harris Lee Wittels, Oklahoma City, Emerson College, etc.',
        },
    ],
    preview: {
        select: {
            descriptor: 'descriptor',
            value: 'values.0.value',
        },
        prepare: ({ descriptor, value }) => {
            const descriptorStr = descriptor.length > 35 ? `${descriptor.slice(0,35)}...` : descriptor;
            const valueStr = value.length > 35 ? `${value.slice(0,35)}...` : value;
            return {
                title: descriptorStr,
                subtitle: valueStr,
            }
        }
    }
}