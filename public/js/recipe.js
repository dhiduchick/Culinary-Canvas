const uploadProfile = async (event) => {
    event.preventDefault();
   const image = document.querySelector('#picture')

   var data = new FormData()

   data.append('image', image.files[0])
    const response = await fetch('/api/images', {
        method: 'POST',
        body: data,
        
    });

    if(response.ok){
        window.location.reload()
    }else{
        alert('Failed to upload profile picture')
    }

}