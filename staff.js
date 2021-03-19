document.getElementById('add').addEventListener('click', function(){
    document.querySelector('.pop').style.display = 'flex';
});
document.querySelector('.cls6').addEventListener('click', function(){
    document.querySelector('.pop').style.display = 'none';
});
document.getElementById('edit').addEventListener('click', function(){
    document.querySelector('.pop').style.display = 'flex';
});
document.querySelector('.cls6').addEventListener('click', function(){
    document.querySelector('.pop').style.display = 'none';
});
//...//
document.getElementById('del').addEventListener('click', function(){
    document.querySelector('.confirm').style.display = 'flex';
});
//...//
document.getElementById('yes').addEventListener('click', function(){
    document.querySelector('.del-pop').style.display = 'flex';
});
document.getElementById('yes').addEventListener('click', function(){
    document.querySelector('.confirm').style.display = 'none';
});
document.querySelector('.cls7').addEventListener('click', function(){
    document.querySelector('.del-pop').style.display = 'none';
});

document.getElementById('no').addEventListener('click', function(){
    document.querySelector('.confirm').style.display = 'none';
});

