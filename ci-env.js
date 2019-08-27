console.log(process.env);
console.log('***********************');

console.log('process.env.NETLIFY: ',process.env.NETLIFY);
console.log('process.env.REPOSITORY_URL: ',process.env.REPOSITORY_URL);
console.log('process.env.PULL_REQUEST: ',process.env.PULL_REQUEST);
console.log('process.env.REVIEW_ID: ',process.env.REVIEW_ID);
console.log('process.env.COMMIT_REF: ',process.env.COMMIT_REF);
console.log('process.env.HEAD: ',process.env.HEAD);

const repo = process.env.REPOSITORY_URL;  
const event = process.env.PULL_REQUEST?'pull_request':'push';
const pull_request_number = process.env.PULL_REQUEST?process.env.REVIEW_ID:'';
const sha = process.env.COMMIT_REF;
const branch = process.env.HEAD;

console.log({repo,event,pull_request_number,sha,branch})
