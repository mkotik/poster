# The React Developer Roadmap

The React Developer Roadmap is a website where users can purchase a beautifully designed roadmap poster, illustrating the journey of a new developer learning React. The project is built using Next.js and TypeScript, offering a fast, scalable, and efficient web experience.

![The React Developer Roadmap](./public/poster2.jpg)

## Live Project

To see the React Developer Roadmap in action, visit [https://reactdeveloperroadmap.com](https://reactdeveloperroadmap.com).

## Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

Before you can run the project, you need to have the following installed:

- [Node.js](https://nodejs.org/en/) (v14.x.x or later)
- [Yarn](https://yarnpkg.com/) (v1.x.x or later)

### Installation

1. Clone the repository
2. Install dependencies: `yarn`
3. Create a .env file with the following variables:

```
NEXT_PUBLIC_STRIPE_PUBLIC_KEY - Stripe public key
NEXT_PUBLIC_STRIPE_SECRET_KEY - Stripe secret key
NEXT_PUBLIC_SERVER_BASE_URL - base url of the server. http://localhost:3000 will work
NEXT_PUBLIC_JWT_SECRET - keyword used for encryption, this can be any string.
```

4. Run the development server: `yarn dev`

The website should now be available at [http://localhost:3000](http://localhost:3000).

## Contact

If you have any questions, suggestions, or feedback regarding this project, feel free to contact me at [mkotik97@gmail.com](mailto:mkotik97@gmail.com).
