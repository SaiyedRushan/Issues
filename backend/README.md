# Issues REST CRUD Backend

- 📁 Modular Structure: Organized by feature for easy navigation and scalability following the single responsibility principle and separation of concerns.
- 💨 Faster Execution with tsx: Rapid TypeScript execution with `tsx` and type checking with `tsc`
- 🔄 Renovate Integration: Automatic updates for dependencies
- 🔒 Security: Helmet for HTTP header security and CORS setup
- 📊 Logging: Efficient logging of http-requests with `morgan`
- 🧪 Comprehensive Testing: Setup with Vitest and Supertest for unit and integration tests
- 🔑 Code Quality Assurance: Husky and lint-staged for consistent quality
- ✅ Unified Code Style: Prettier for consistent formatting and ESlint for consistent coding standards
- 🐳 Docker Support: Ready for containerization and deployment
- 📝 Input Validation with Zod: Strongly typed request validation using `Zod`
- 🧩 Swagger UI: Interactive API documentation generated from Zod schemas
- 👨‍💻 CI/CD pipeline: Github actions workflows to build, test, ensure code quality, build and push docker image

## Steps to run the project

- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables
- Development Mode: `npm run dev`
- Building: `npm run build`
- Testing: `npm run test`
- Production Mode: Set `.env` to `NODE_ENV="production"` then `npm run build && npm run start`
