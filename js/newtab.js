// const BASE_URL = "http://localhost:3000"
const BASE_URL = "http://cambalache.herokuapp.com"

$(document).ready(async () => {
	// Show random book
	const response = await fetch(`${BASE_URL}/api/books/random`);
	const body = await response.json();
	const { book } = body;
	const description = book.description.split(" ").slice(0, 40).join(" ") + " ...";
	$("#book-description").text(description);
	$("#book-author").text(book.author.name);
	$("#book-author").attr("href", buildAuthorPath(book.author));
	$("#image-link").prepend($("<img>",{ id: "book-image", src: book.imageUrl }));
	$("#image-link").attr("href", buildBookPath(book));

	// Show current time
	const now = new Date();
	const hours = now.getHours();
	const minutes = now.getMinutes();
	$("#clock").text(`${zeroPad(hours, 2)}:${zeroPad(minutes, 2)}`);
});

const buildAuthorPath = author => `${BASE_URL}/authors/${author.kebabName}`;

const buildBookPath = book => `${BASE_URL}/books/${book.isbn}`;

const zeroPad = (n, z) => ("0".repeat(z) + n).slice(-z);
