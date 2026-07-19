import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="w-full min-h-screen font-sans bg-black">

        {/* HEADER */}
        <header className="fixed top-0 w-full flex justify-between items-center px-8 py-5 z-50 bg-black/50 backdrop-blur-sm">
        <Link to="/" className="text-xl md:text-2xl font-extrabold tracking-widest text-white hover:text-blue-400 transition">
        CAR DEALERSHIP
        </Link>
        <Link to="/login" className="text-xs md:text-sm font-bold uppercase tracking-widest text-white hover:text-blue-400 transition">
        Login / Register
        </Link>
        </header>

        {/* PART 2: TOP SECTION */}
        <section className="relative h-96 w-full bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center mt-16">
        <div className="absolute left-0 w-1/2 px-8 md:px-16 z-20">
        <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 mb-4">
        Unrivaled Speed.<br />Fast Service.
        </h1>
        <p className="text-blue-100 text-sm md:text-lg max-w-sm hidden md:block">
        Experience the pinnacle of automotive engineering with premium selection and zero-friction customer care.
        </p>
        </div>
        <div className="absolute right-0 w-1/2 h-full z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-transparent to-transparent z-20"></div>
        <img src="https://bugatti-newsroom.imgix.net/667499268f9399fbd36b30c1/BUGATTI-World-Premiere-Presskit-Images-01.jpg" alt="Bugatti" className="w-full h-full object-cover" />
        </div>
        </section>

        {/* PART 3: MIDDLE SECTION */}
        <section className="relative h-96 w-full flex flex-col items-center justify-center text-center">
        <img
        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QrCRXhpZgAASUkqAAgAAAACADEBAgAHAAAAJgAAAGmHBAABAAAALgAAAIYAAABQaWNhc2EAAAQAAJAHAAQAAAAwMjIwAqAEAAEAAAAwBgAAA6AEAAEAAACgAgAAIKQCACEAAABkAAAAAAAAAGFiMjljNjU2MjQ0N2FhNDkwMDAwMDAwMDAwMDAwMDAwAAAGAAMBAwABAAAABgAAABoBBQABAAAA1AAAABsBBQABAAAA3AAAACgBAwABAAAAAgAAAAECBAABAAAA5AAAAAICBAABAAAA1QkAAAAAAABIAAAAAQAAAEgAAAABAAAA/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCABIAKADASIAAhEBAxEB/8QAHAAAAQUBAQEAAAAAAAAAAAAABQACAwQGAQcI/8QAOxAAAQMCBAMGAwUGBwAAAAAAAQIDBAARBRIhMUFRYQYTFCJxgTKRoSNCUmKxBxUkU8HRJTM0RHKS4f/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACIRAAICAwACAwADAAAAAAAAAAABAhEDEiEEEzFBgVFhcf/aAAwDAQACEQMRAD8A+bhHPKpBHPKsu5iE5blzMcJB0sqwqJT7zi8zrzi1E75zXXucupsBHtuKkTGP4TWQely3UoQ7LWpCCCkKJ0I2p6cTlBxK/GuhQ2JUdKN2VqjXeHAFzYAca6IwIvpbnespNxOdKiCO84HEZsx0FyeXpVS+gT3hA5BRsKe7FRuPCHe1LwZ5Vj4WJzISlJZkLSk8Abg/Oio7Wzu7P8NGKraEAi31qlMVBzwguAdzsOdIQ+lYmRNmSJAkuvuKdSbg3tl9OVa7Bu0sJ1CWsQ+xcFh3gF0q6nlTU0JxLQhjlTFxwNAL0YeegNtJdcmMJbV8Ks4samENBAUATcbinsidWAfCrI0TTfBHjatAYif5RppiJ/kn50Wg6AfBkcq4Y3pRwxTwaHvUao7nAIHtTsOgQxulMMa3CjSor5PD2FMVFdosAMY/SmmOeVFVxHedQLhundZoEeejcUljLbXS2hvUoaULktr9ta4G1kXDaiAeXGuY3Oa2toa4dCc1gDUgYVewuFEbXFPTHUEJutAF9LnegCrde9yQKkS4CLKG/wCtWm44JyBaM3JJqMxQhWVTqUkjS5oAYbX0+G2172pBdgL7HX0qRLDAT/rG79ATUzMdtawhL6HSdgEm9AUUzpcE/wDldTfvNSRWj7PdlJWOKU5FUlqK0bOynQQhB5D8Sug+lHpeA4Fh7RSjJKcTu7KJt6hKbD9a0jBvpEpxj8mBWmxGot67VpezPaSRh6xHluOuxALJSLEt+l+HSuycTLCQGo0IJ2uIjZH1BobKxl19olzDIDozZQUxwgn/AK2oaUflijJy+EauV20hIcKWGpLyQPiISnX0NSYZ2qiSk2lK8IvgVC6SPUbVkoMBGKJCYv8ADSQrKtjKVAA7KCjw6X0ok52IxFhYRImxmFEAhKtyDy1sfnVwxykrSJnljB1Jhid2qgMPlptbkjLuptPlHud6txsThTGS4zOasE5lAnKUjresFMwuXCxByI7lKk8bWuNxpUjER82CkkC9h5ayeRLhsoN9NTKx3D2llCH3ZCuJQDYe5ruH4pHm57qMcp2DpGo9azhw91twDIdanaw185/slGx50vch+p/Zo3JDQvaZHta/xih8jFYSPintH/jr+lA5uGPZyQ2gC3FVDl4e5muVJSB70e1h60DsyyNFq0/NXbKAJzKIOvqaYFkmx26CnHNmsEqPOwrIsaATrx6inrSW2xdOhPPS9K7hXZIzVM05LQryBwEDSwuKAK6MqtyEnhen5cvWpURJDqvKw4TvomjPZzA1PYtFGIt9xBLqe/cVcZUX15011g3SssYN2VkSkCRPc8O2Ww6QNVBHBR5X4DUm4Fta9Aw39neCM4YmZir7sB1WqELcJWUEW86b2TccNxVsvMYWD4RUd5zNnDrK0ui/3TZJ0twB29azOIyps18uSXXVXOtzrXu4vCx1zp4OXz8m3eB7F5cRqG1hsDEYrMVhORplhhYA+p9zWOm4cuUVKRKS4Qd7KNvrYe9QO4tHQ8Y8GMzJfF9XnQhsepURmP06Vc7PY6MPlvTcabwDGwlhSGoLzrpQ2o8QlrKCR1VaufLPxsb0XX/Rvih5GRbvi/wByIThaU25OSGQbkJF0jhfe16puHDoyQiO+6+q24VZIO19tdDXcRmGaG20qUbE3bygIHI9eNU8QZTFkKbBBQoa22JHEVzZMuK9ccf1nZjxZaTnL8RfiYuxBQERoxWQbguOE2PPS1KZjM3EAe/KQne6U2Pz3NUGkQ0tJV9q44dwoAJH9TT0NOPKPlKUcBzqZ55KOrf4ghgg5bJd/lmw7DsDEVPeOK3y0lBbUpVykfh9K0LuGxWiTkBsbjMSbVl8IxZmC24ppPd5/MQedKb2pccJypt71xOLbs7VJJUaUqbBslCAOgAqlKfbCsiVJuTa6lWA96zCseeWCLEcjeoF4ktfxC9UoC3QSxN9PeFDLiXfxKSDa/S+9DXMyyCvYCwqMztQMn1qNcsE/DaqolyTB6ItzcpAq5Hi5iMneL4eQX/Sr3ikp/yIUVrqUFZ+aia4uZNX8Ul0DklWX9LU6RNtlhrCnSkFyP3aTxecCAfmRV+JFgsj7SRHTzDaFOH+g+tBm1AKuSLnjzq4w6NLIKj6U+B1B+NIw1rQMyXiOJKW0n2Fz9a7Nnw3Yj0dbIjIW2Qlxu63EKt5Tcna9vahaO8UNUpSOprq2m1DzLB6Ck4opSYGlvhfeKXJh5lJutCEFAcUd+vXa2ulBMziUedw32ASrU/2rUvYaw7fyVScwJs3IJSKyjtC6LlUkrAKZCyoJU33nqLmrjrL7LRUpsNpPKwq2vBAPhdUPSojgaibqcUfUVvDK0umUsVvhSwx5picha8qkp1so6E8qU11Tq0AKCykaqGxJNX04Nbcp96s4fgU2fKTFw6G7MfP3GUlR9+VZlUwIhJvdWtXGVSHVJZZQ4tR0SlAJJrTPdl4+Eq/x+chL4/2URQcd9FK+FP1qs/iMhttUfCoacNZIse7N3Vj8yzr8rVaivsluQFlxpUZzu5DZbXa5SpWo9RwqIIt1qyppQN1Akn5mmrSRuCPagnpDa1NOp0qRQO5BtTD60DGA21rhJNdtyrikkDUWvrSsC+V8k/OuXJ3IpUqk0S4OSq2oF6mbeUPvW9KVKmKyw3JNqkTIG53+dKlTETIk8tOpqQPIPxG55UqVA0NcktoGpCas4Ph+J406W8Lguva+ZZFkJ9VHQUqVSWgq5h/ZjAyTj2JKxSWneFAV5AeS3P7VRxTtpiT8VWH4SyxgmHEWLMNOVSx+ZW6qVKgdmcSsBW5udydzTy6kCw0pUqBEKnhwqNbthzNKlQFjM5OqjfnXCobkUqVIBlwTe1Fu0mOoxeFhkf92QongY/clbDeUuak3PTXbnc8aVKkB//Z"
        alt="Premium Showroom Background"
        className="absolute inset-0 w-full h-full object-cover brightness-[0.3]"
        />
        <div className="relative z-10 p-6 bg-black/20 backdrop-blur-sm rounded-xl">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 uppercase">
        CAR DEALERSHIP
        </h2>
        <Link to="/login" className="inline-block bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition shadow-lg">
        Welcome
        </Link>
        </div>
        </section>

        {/* PART 4: BOTTOM SECTION */}
        <section className="relative h-96 w-full bg-black flex items-center">
        <div className="absolute left-0 w-1/2 h-full z-10">
        <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent z-20"></div>
        <img src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200" alt="Sleek Black Car" className="w-full h-full object-cover" />
        </div>
        <div className="absolute right-0 w-1/2 px-8 md:px-16 z-20 text-right flex flex-col items-end">
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-l from-white to-gray-500 mb-4">
        Precision<br />Engineering.
        </h2>
        <p className="text-gray-400 text-sm md:text-lg max-w-sm hidden md:block">
        Every vehicle in our showroom is meticulously inspected to ensure you drive away with perfection.
        </p>
        </div>
        </section>

        </div>
    );
}
