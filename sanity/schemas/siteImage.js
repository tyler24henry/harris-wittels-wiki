import { AiFillCamera as icon } from 'react-icons/ai';

export default {
    name: 'siteImage',
    title: 'Site Image',
    type: 'document',
    icon,
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'How will this image be used on the site?',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            }
        },
    ],
    preview: {
        select: {
            name: 'name',
            image: 'image',
        },
        prepare: ({ name, image }) => {
            return {
                title: name,
                media: image,
            }
        }
    }
}