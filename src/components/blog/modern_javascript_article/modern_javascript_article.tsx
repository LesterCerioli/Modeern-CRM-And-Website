"use client";
import * as S from "./styles";

interface ModernJavaScriptArticleProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModernJavaScriptArticle({ isOpen, onClose }: ModernJavaScriptArticleProps) {
  if (!isOpen) return null;

  return (
    <S.ArticleModal>
      <S.ArticleOverlay onClick={onClose} />
      <S.ArticleContent>
        <S.CloseButton onClick={onClose}>×</S.CloseButton>
        
        <S.ArticleHeader>
          <S.ArticleBadge>JavaScript</S.ArticleBadge>
          <S.ArticleTitle>Mastering Modern JavaScript: ES6+ Features You Need to Know</S.ArticleTitle>
          <S.ArticleMeta>
            <span>January 15, 2024</span>
            <S.DotDivider>•</S.DotDivider>
            <span>8 min read</span>
          </S.ArticleMeta>
        </S.ArticleHeader>

        <S.ArticleBody>
          <S.LeadParagraph>
            JavaScript has evolved dramatically over the past few years. What was once 
            a simple scripting language for basic browser interactions has become one 
            of the most powerful and versatile programming languages in the world.
          </S.LeadParagraph>

          <p>
            With the introduction of <strong>ES6 (ECMAScript 2015)</strong> and subsequent 
            updates (ES7, ES8, and beyond), JavaScript now offers cleaner syntax, better 
            performance, and tools that enable developers to write more scalable and 
            maintainable code.
          </p>

          <p>
            In this article, we'll explore the <strong>most important ES6+ features</strong> 
            every modern JavaScript developer should master.
          </p>

          <S.Section>
            <S.SectionTitle>Why ES6+ Matters</S.SectionTitle>
            <p>
              Before ES6, JavaScript code was often verbose, error-prone, and difficult to scale. 
              ES6+ introduced features that:
            </p>
            <S.FeatureList>
              <S.FeatureItem>Improve code readability</S.FeatureItem>
              <S.FeatureItem>Reduce boilerplate</S.FeatureItem>
              <S.FeatureItem>Enable functional and object-oriented patterns</S.FeatureItem>
              <S.FeatureItem>Enhance performance and maintainability</S.FeatureItem>
              <S.FeatureItem>Align JavaScript with enterprise-level development needs</S.FeatureItem>
            </S.FeatureList>
            <S.CalloutBox>
              <strong>Important:</strong> If you're working with <S.Highlight>React, Node.js, Next.js, 
              or modern frameworks</S.Highlight>, ES6+ is not optional — it's essential.
            </S.CalloutBox>
          </S.Section>

          <S.Section>
            <S.SectionTitle>1. `let` and `const`: Better Variable Declarations</S.SectionTitle>
            <p>
              ES6 introduced <code>let</code> and <code>const</code> as alternatives to <code>var</code>.
            </p>
            <S.CodeBlock>
{`let counter = 0;
const API_URL = "https://api.example.com";`}
            </S.CodeBlock>
            <S.Subsection>
              <S.Subtitle>Why it matters:</S.Subtitle>
              <S.BulletList>
                <li>Block-scoped variables</li>
                <li>Prevents accidental re-declarations</li>
                <li><code>const</code> protects values from reassignment</li>
              </S.BulletList>
              <p>This leads to safer and more predictable code.</p>
            </S.Subsection>
          </S.Section>

          <S.Section>
            <S.SectionTitle>2. Arrow Functions: Cleaner and More Expressive</S.SectionTitle>
            <p>
              Arrow functions provide a shorter syntax and lexical <code>this</code> binding.
            </p>
            <S.CodeBlock>
{`const sum = (a, b) => a + b;`}
            </S.CodeBlock>
            <S.Subsection>
              <S.Subtitle>Benefits:</S.Subtitle>
              <S.BulletList>
                <li>Less boilerplate</li>
                <li>No confusion with <code>this</code></li>
                <li>Perfect for callbacks and functional programming</li>
              </S.BulletList>
            </S.Subsection>
          </S.Section>

          <S.Section>
            <S.SectionTitle>3. Template Literals: Dynamic Strings Made Easy</S.SectionTitle>
            <p>Say goodbye to string concatenation.</p>
            <S.CodeBlock>
{`const name = "Lucas";
console.log(\`Welcome to \${name} Technology Service\`);`}
            </S.CodeBlock>
            <S.Subsection>
              <S.Subtitle>Advantages:</S.Subtitle>
              <S.BulletList>
                <li>Cleaner syntax</li>
                <li>Supports multi-line strings</li>
                <li>Ideal for logs, UI messages, and HTML templates</li>
              </S.BulletList>
            </S.Subsection>
          </S.Section>

          <S.Section>
            <S.SectionTitle>4. Destructuring: Extract Data with Precision</S.SectionTitle>
            <p>Destructuring simplifies object and array handling.</p>
            <S.CodeBlock>
{`const user = { name: "John", role: "Developer" };
const { name, role } = user;`}
            </S.CodeBlock>
            <S.Subsection>
              <S.Subtitle>Why developers love it:</S.Subtitle>
              <S.BulletList>
                <li>Reduces repetitive code</li>
                <li>Improves readability</li>
                <li>Commonly used in React and API responses</li>
              </S.BulletList>
            </S.Subsection>
          </S.Section>

          <S.Section>
            <S.SectionTitle>5. Spread and Rest Operators (`...`)</S.SectionTitle>
            <p>These operators make working with arrays and objects much easier.</p>
            <S.CodeBlock>
{`const newArray = [...oldArray, 4, 5];`}
            </S.CodeBlock>
            <S.CodeBlock>
{`function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}`}
            </S.CodeBlock>
            <S.Subsection>
              <S.Subtitle>Use cases:</S.Subtitle>
              <S.BulletList>
                <li>Immutable updates</li>
                <li>Function arguments</li>
                <li>State management in frontend apps</li>
              </S.BulletList>
            </S.Subsection>
          </S.Section>

          <S.Section>
            <S.SectionTitle>6. Default Parameters</S.SectionTitle>
            <p>Avoid unnecessary checks inside functions.</p>
            <S.CodeBlock>
{`function greet(name = "Guest") {
  return \`Hello, \${name}\`;
}`}
            </S.CodeBlock>
            <p>This leads to cleaner and more predictable functions.</p>
          </S.Section>

          <S.Section>
            <S.SectionTitle>7. Promises and Async/Await</S.SectionTitle>
            <p>Modern JavaScript handles asynchronous operations more elegantly than ever.</p>
            
            <S.Subsection>
              <S.Subtitle>Promises:</S.Subtitle>
              <S.CodeBlock>
{`fetch("/api/data")
  .then(res => res.json())
  .then(data => console.log(data));`}
              </S.CodeBlock>
            </S.Subsection>
            
            <S.Subsection>
              <S.Subtitle>Async/Await:</S.Subtitle>
              <S.CodeBlock>
{`async function loadData() {
  const response = await fetch("/api/data");
  const data = await response.json();
  console.log(data);
}`}
              </S.CodeBlock>
            </S.Subsection>
            
            <S.Subsection>
              <S.Subtitle>Why async/await wins:</S.Subtitle>
              <S.BulletList>
                <li>Synchronous-like code</li>
                <li>Better error handling</li>
                <li>Improved readability</li>
              </S.BulletList>
            </S.Subsection>
          </S.Section>

          <S.Section>
            <S.SectionTitle>8. Modules: Cleaner Code Organization</S.SectionTitle>
            <p>ES6 introduced native modules.</p>
            <S.CodeBlock>
{`// export
export function calculateTotal() {}


import { calculateTotal } from "./utils.js";`}
            </S.CodeBlock>
            <S.Subsection>
              <S.Subtitle>This enables:</S.Subtitle>
              <S.BulletList>
                <li>Better code separation</li>
                <li>Reusability</li>
                <li>Scalable architectures</li>
              </S.BulletList>
            </S.Subsection>
          </S.Section>

          <S.Section>
            <S.SectionTitle>9. Optional Chaining (`?.`) and Nullish Coalescing (`??`)</S.SectionTitle>
            <p>Avoid runtime errors caused by `undefined` or `null`.</p>
            <S.CodeBlock>
{`const city = user?.address?.city ?? "Unknown";`}
            </S.CodeBlock>
            <p>These features make your code safer and more resilient.</p>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Final Thoughts</S.SectionTitle>
            <p>
              Mastering <S.Highlight>ES6+ features</S.Highlight> is no longer a "nice to have" — 
              it's a requirement for modern JavaScript development. Whether you're building web 
              applications, APIs, microservices, or enterprise systems, these features help you 
              write <S.Highlight>cleaner, safer, and more efficient code</S.Highlight>.
            </p>
            
            <p>
              At <S.Highlight>Lucas Technology Service</S.Highlight>, we continuously adopt modern 
              technologies and best practices to deliver scalable, high-quality solutions for our 
              clients. Stay tuned for more technical insights, tutorials, and updates from the 
              world of technology.
            </p>
            
            <S.FinalCallout>
              <strong>🚀 The future of JavaScript is modern — and it starts with ES6+.</strong>
            </S.FinalCallout>
          </S.Section>

          <S.ActionButtons>
            <S.ShareButton>Share on Twitter</S.ShareButton>
            <S.ShareButton linkedin>Share on LinkedIn</S.ShareButton>
            <S.CloseArticleButton onClick={onClose}>
              Close Article
            </S.CloseArticleButton>
          </S.ActionButtons>
        </S.ArticleBody>
      </S.ArticleContent>
    </S.ArticleModal>
  );
}