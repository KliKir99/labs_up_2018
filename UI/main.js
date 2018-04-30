(function () {
    let posts = [
        {
            id: '1',
            description: 'smth',
            createdAt: new Date('2018-01-01'),
            author: 'Orsay',
            photo: 'https://picsum.photos/300/300',
            hashtags: ['#dog', '#like'],
        },
        {
            id: '2',
            description: 'smth',
            createdAt: new Date('2018-01-02'),
            author: 'Kirill',
            photo: 'https://picsum.photos/300/300',
            hashtags: ['#cat', '#cute'],
        },
        {
            id: '3',
            description: 'smth',
            createdAt: new Date('2018-01-03'),
            author: 'Orsay',
            photo: 'https://picsum.photos/300/300',
            hashtags: ['#job', '#study'],

        },
        {
            id: '5',
            description: 'smth',
            createdAt: new Date('2018-01-04'),
            author: 'Orsay',
            photo: 'https://picsum.photos/300/300',
            hashtags: ['#lol', '#kek'],

        },
        {
            id: '6',
            description: 'smth',
            createdAt: new Date('2018-01-05'),
            author: 'Kirill',
            photo: 'https://picsum.photos/300/300',
            hashtags: ['#hippo', '#water'],
        },
        {
            id: '7',
            description: 'smth',
            createdAt: new Date('2018-01-06'),
            author: 'Kirill',
            photo: 'https://picsum.photos/300/300',
            hashtags: ['#people', '#man'],

        },
        {
            id: '8',
            description: 'smth',
            createdAt: new Date('2018-01-07'),
            author: 'Kirill',
            photo: 'https://picsum.photos/300/300',
            hashtags: ['#nature', '#beauty'],
        },
        {
            id: '9',
            description: 'smth',
            createdAt: new Date('2018-01-08'),
            author: 'Orsay',
            photo: 'https://picsum.photos/300/300',
            hashtags: ['#doge', '#cate'],
        },
    ];

    class Photos {

        constructor(posts) {
            this.posts = posts;
            this.validation = {
                types: {
                    id: 'string',
                    photo: 'string',
                    author: 'string',
                    date: 'Date',
                    description: 'string',
                },

                max: {
                    description: 200
                },

                min: {
                    photo: 1
                }
            };
        }

        getPhotoPosts(skip = 0, top = 9, filterConfig) {
            let results = this.posts.filter(x => !x.deleted);

            if (filterConfig) {
                if (filterConfig.author) {
                    results = results.filter(x => x.author === filterConfig.author);
                }
                if (filterConfig.hashtags) {
                    for (let hashtag of filterConfig.hashtags) {
                        this.posts = this.posts.filter(x => x.hashtags.includes(hashtag))
                    }
                }
            }
            if (skip) {
                results = results.slice(skip);
            }
            if (top) {
                results = results.slice(0, top);
            }
            return results;
        }

        getPhotoPost(id) {
            return this.posts.find(x => x.id === id);
        }

        validatePhotoPost(post) {
            for (let key in this.validation.types) {
                if (!post.hasOwnProperty(key)) {
                    throw new Error(`Missing field: ${key}`);
                }
                if (typeof post[key] === 'object') {
                    if (post[key].constructor.name !== this.validation.types[key])
                        throw new Error(`Invalid type`);
                } else {
                    if (typeof post[key] !== this.validation.types[key]) {
                        throw new Error(`Invalid type`);
                    }
                }
            }

            for (let key in this.validation.min) {
                if (post[key].length < this.validation.min[key]) {
                    throw new Error();
                }
            }

            for (let key in this.validation.max) {
                if (post[key].length > this.validation.max[key]) {
                    throw new Error();
                }
            }
        }


        addPhotoPost(post) {
            try {
                this.validatePhotoPost(post);

            } catch (e) {
                return;
            }
            this.posts.push(post);
        }

        editPhotoPost(id, photoPostChanges) {
            if (photoPostChanges.id || photoPostChanges.createdAt || photoPostChanges.author) {
                return false;
            } else {
                Object.assign(this.getPhotoPost(id), photoPostChanges);
                return true;

            }

        }

        removePhotoPost(id) {
            this.getPhotoPost(id).deleted = true
        }
    }

    window.Photos = new Photos(posts);
/*
    for (let postConfig of posts) {
        let post = document.getElementById('photoPost').cloneNode(true);
        post.style.display = 'block';
        post.getElementById('name').innerText = postConfig.author;
        post.getElementById('date').innerText = postConfig.date;
        post.querySelector('img').src = postConfig.photo;
        post.getElementById('description').innerText = postConfig.description;
        for (let hashtag of postConfig.hashtags) {
            post.getElementById('hashtags').innerText += ' ' + hashtag;
        }

        document.getElementById('lenta').appendChild(post);
    }
*/

})();