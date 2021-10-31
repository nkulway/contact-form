
const handleSubmit = (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const body = formatFormData(data);
  postData("http://localhost:8080/contacts/add", body).then((response) =>
    console.log(response)
  );
};

function formatFormData(fd) {
  const data = {};
  for (let key of fd.keys()) {
    data[key] = fd.get(key);
  }
  return data;
}

// const form = document.getElementById("form");
// form.addEventListener("submit", handleSubmit);

async function postData(url, body) {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body, null, 4)
  });
  return response.json();
}

const contactList = document.getElementById("contactList");
contactList.addEventListener("click", handleClick);

function handleClick(e) {
  const target = e.target;
  const id = target.id;

  if (target.tagName === 'BUTTON'){
    const parent = target.parentElement
    const body = {
      id: target.getAttribute('data-id'),
      name: parent.querySelector('input').value
    }
    postData(`http://localhost:8080/contacts/edit`, body)
        .then(res => console.log(res.message))
        .catch(err => console.log(err));
  } else {
    target.innerHTML = `
    <input value="${target.innerText}" />
    <button data-id="${id}">Update</button> 
  `;
  }



 

  
}
