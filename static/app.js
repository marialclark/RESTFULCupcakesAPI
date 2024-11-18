const BASE_URL = "http://localhost:5000/api";

// Javascript (using axios and jQuery) that queries the API to get
// the cupcakes and adds to the page:
function createCupcakeHTML(cupcake) {
	return `
    <div> 
      <li>
        <strong>Flavor: </strong> ${cupcake.flavor} <br>
        <strong>Size: </strong> ${cupcake.size} <br>
        <strong>Rating: </strong> ${cupcake.rating} <br>
      </li>
        <img src="${cupcake.image}" alt="Cupcake Image" width="100">
    </div>
  `;
}

async function displayCupcakes() {
	const response = await axios.get(`${BASE_URL}/cupcakes`);
	const cupcakes = response.data.cupcakes;

	cupcakes.forEach((cupcake) => {
		const cupcakeHTML = createCupcakeHTML(cupcake);
		$("#cupcake-list").append(cupcakeHTML);
	});
}

// Handles form submission to both let the API know about the new
// cupcake and updates the list on the page to show it:
$("#new-cupcake-form").on("submit", async function (event) {
	event.preventDefault();

	let flavor = $("#flavor").val();
	let size = $("#size").val();
	let rating = $("#rating").val();
	let image = $("#image").val();

	const cupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
		flavor: flavor,
		size: size,
		rating: rating,
		image: image,
	});

	let newCupcake = $(createCupcakeHTML(cupcakeResponse.data.cupcake));
	$("#cupcake-list").append(newCupcake);
	$("#new-cupcake-form").trigger("reset");
});

$(document).ready(function () {
	displayCupcakes();
});
