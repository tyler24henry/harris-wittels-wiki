import { AiOutlineTwitter as icon } from 'react-icons/ai';

export default {
    name: 'tweet',
    title: 'Tweet',
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
            name: 'link',
            title: 'Link',
            type: 'string',
        },
        {
            name: 'content',
            title: 'Content',
            type: 'text',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Image attached to the tweet',
            options: {
                hotspot: true,
            }
        },
        {
            name: 'youtubeUrl',
            title: 'Youtube URL',
            type: 'string',
            description: 'Youtube URL of video attached to the tweet',
        },
        {
            name: 'replyingTo',
            title: 'Replying to',
            type: 'string',
            description: 'Who the tweet is in reply to',
        },
        {
            name: 'isRetweet',
            title: 'Is it a retweet?',
            type: 'boolean',
            options: {
                layout: 'checkbox',
            }
        },
        {
            name: 'retweetName',
            title: 'Retweet name',
            type: 'string',
            description: 'Name of user who is being retweeted',
        },
        {
            name: 'retweetHandle',
            title: 'Retweet handle',
            type: 'string',
            description: 'Handle of user who is being retweeted',
        },
        {
            name: 'retweetAvatar',
            title: 'Retweet avatar',
            type: 'image',
            description: 'Avatar of user who is being retweeted',
            options: {
                hotspot: true,
            }
        },
    ],
    preview: {
        select: {
            content: 'content',
            month: 'month',
            day: 'day',
            year: 'year',
        },
        prepare: ({ content, month, day, year }) => {
            const title = content.length > 35 ? `${content.slice(0,35)}...` : content;
            const subtitle = `${month} ${day}, ${year}`;
            return {
                title,
                subtitle,
            }
        }
    }
}