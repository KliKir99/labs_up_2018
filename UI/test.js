(function (){
    console.log(Photos.getPhotoPosts(0, 9));
    console.log(Photos.getPhotoPosts(0, 9, {author: 'Orsay'}));
    console.log(Photos.getPhotoPost('1'));

    try {
        console.log('Validating post with wrong id')
        Photos.validatePhotoPost({
            id: 4,
            description: 'dog',
            date: new Date('2018-01-06'),
            author: 'Kirill',
            photo: 'fhcgjhbjj;lk'
        })
    }
    catch (error) {
        console.warn(error);
    }

    Photos.addPhotoPost({
        id: '12',
        description: 'hippie',
        date: new Date('2018-01-12'),
        author: 'Armen',
        photo: 'link_to_photo'
    });
    console.log(Photos.getPhotoPosts(0, 13));

    Photos.editPhotoPost('12', {description:'kek'});
    console.log(Photos.getPhotoPosts(0, 13));

    Photos.removePhotoPost('12');
    console.log(Photos.getPhotoPosts(0, 13));
})();

