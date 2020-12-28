import { SiWriteDotAs as icon } from 'react-icons/si';
import {isUniqueAcrossAllDocuments} from '../lib/isUniqueAcrossAllDocuments'

export default {
    name: 'fanPost',
    title: 'Fan Post',
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
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Title of fan post',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 100,
                isUnique: isUniqueAcrossAllDocuments,
            },
        },
        {
            name: 'content',
            title: 'Content',
            type: 'text',
        },
        {
            name: 'firstName',
            title: 'First name',
            type: 'string',
        },
        {
            name: 'lastName',
            title: 'Last name',
            type: 'string',
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Avatar of contributor',
            options: {
                hotspot: true,
            }
        },
        {
            name: 'facebookUrl',
            title: 'Facebook URL',
            type: 'string',
        },
        {
            name: 'twitterUrl',
            title: 'Twitter URL',
            type: 'string',
        },
        {
            name: 'websiteUrl',
            title: 'Website URL',
            type: 'string',
        },
    ],
    preview: {
        select: {
            title: 'title',
            content: 'content',
            image: 'image',
        },
        prepare: ({ title, content, image }) => {
            return {
                title,
                subtitle: content,
                media: image,
            }
        }
    }
}