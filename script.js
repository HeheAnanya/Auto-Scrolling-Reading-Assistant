let scrollInterval;
let scrollSpeed = 0.7; // Default scrolling speed
let userIsReading = true;
let lastScrollTime = Date.now();  // Calculating time
let isScrollingPaused = true; // Check if page is scrolling?
const content = document.querySelector(".content"); // Select book 


const observer = new IntersectionObserver(handleVisibilityChange, { threshold: 0.7 });
observer.observe(content);

// Start scrolling after 10 sec delay when user enters the content page
setTimeout(() => {;
    isScrollingPaused = false; // Allow scrolling after delay
    startScrolling();
}, 10000);


function startScrolling() {
    if (!content || isScrollingPaused) return;     // Page won't scroll
    if (scrollInterval) {
        clearInterval(scrollInterval)
    }

    scrollInterval = setInterval(() => {
        window.scrollBy(0, scrollSpeed);
    }, 50);
}

function stopScrolling() {
    clearInterval(scrollInterval);
}

function handleVisibilityChange(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {  
            userIsReading = true;
            if (!isScrollingPaused) startScrolling();
        } else {
            userIsReading = false;
            stopScrolling();
        }
    });
}

// Auto-pause if user is inactive for 3 seconds
function startAutoPauseCheck() {
    setInterval(() => {
        if (Date.now() - lastScrollTime > 3000) {
            console.log("User inactive - Pausing scrolling");
            userIsReading = false;
            stopScrolling();
        }
    }, 1000);
}

// Detect user scrolling/mouse movement to restart scrolling
document.addEventListener("scroll", () => {
    userIsReading = true;
    lastScrollTime = Date.now();
    if (!isScrollingPaused) startScrolling();
});

document.addEventListener("mousemove", () => {
    userIsReading = true;
    lastScrollTime = Date.now();
});

// 🔼🔽 Adjust scrolling speed with keyboard shortcuts
document.addEventListener("keydown", (event) => {
    if (event.key === " ") { //  Space key pause/resume the  scrolling
        event.preventDefault(); // Prevents page from jumping down
        isScrollingPaused = !isScrollingPaused;
        if (isScrollingPaused) {
            stopScrolling();
        } else {
            startScrolling();
        }
    }
});













// async function fetchingBook(bookId) {
//     try {
//         console.log("Fetching book with ID:", bookId);

//         const proxyUrl = "https://api.allorigins.win/raw?url=";  // Use a CORS proxy
//         const gutenbergUrl = `https://www.gutenberg.org/files/$17157/17157-0.txt`;
//         console.log(gutenbergUrl)
        
//         const response = await fetch(proxyUrl + encodeURIComponent(gutenbergUrl));

//         if (!response.ok) {
//             throw new Error(`Failed to fetch book: ${response.statusText}`);
//         }

//         const bookText = await response.text();
//         console.log("Fetched Book Content:", bookText.substring(0, 100)); // Log only first 100 chars

//         // ✅ Update localStorage with new book content
//         localStorage.setItem("bookContent", bookText);
//         localStorage.setItem("selectedBookId", bookId); // Store book ID for debugging

//         // ✅ Ensure page reloads with the new book content
//         window.location.href = "page2.html";

//     } catch (err) {
//         console.error("Error fetching book:", err);
//     }
// }


// function loadBookContent(event) {
//     try {
//         const bookId = event.target.getAttribute("book-id");
//         if (bookId) {
//             console.log("Clicked book ID:", bookId); // Debugging
//             fetchingBook(bookId);  // Call function with correct book ID
//         } else {
//             console.error("No book ID found on clicked element");
//         }
//     } catch (err) {
//         console.error("Error loading book content:", err);
//     }
// }
