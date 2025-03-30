import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const MDX_COMPONENTS_DIR = path.join(process.cwd(), 'src/components/mdx/includes');

// Function to process MDX includes
function processMDXIncludes(content, filePath) {
  // Regular expression to match include statements
  const includeRegex = /import\s+(\w+)\s+from\s+'@includes\/([^']+)'/g;
  
  let processedContent = content;
  let match;

  while ((match = includeRegex.exec(content)) !== null) {
    const [fullMatch, componentName, includePath] = match;
    
    // Resolve the include path relative to the MDX components directory
    const absoluteIncludePath = path.join(MDX_COMPONENTS_DIR, includePath);
    
    try {
      // Read the included file
      const includeContent = fs.readFileSync(absoluteIncludePath, 'utf8');
      
      // Replace the import statement with the actual content
      processedContent = processedContent.replace(
        fullMatch,
        `\n\n${includeContent}\n\n`
      );
    } catch (error) {
      console.error(`Error processing include ${includePath}:`, error);
      // Keep the original import statement if there's an error
      processedContent = processedContent.replace(
        fullMatch,
        `\n\n<!-- Error: Could not include ${includePath} -->\n\n`
      );
    }
  }

  return processedContent;
}

// Function to get MDX content with component support
export async function getMDXContent(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    console.log('Attempting to read file:', fullPath);
    
    if (!fs.existsSync(fullPath)) {
      console.error(`File not found: ${fullPath}`);
      return null;
    }

    const source = fs.readFileSync(fullPath, 'utf8');
    const { data: frontmatter, content } = matter(source);
    const processedContent = processMDXIncludes(content, filePath);
    
    // Serialize the MDX content
    const mdxSource = await serialize(processedContent, {
      parseFrontmatter: true,
      mdxOptions: {
        development: process.env.NODE_ENV === 'development',
      }
    });

    return {
      frontmatter,
      content: mdxSource,
      slug: path.basename(filePath, path.extname(filePath)),
    };
  } catch (error) {
    console.error('Error processing MDX file:', error);
    return null;
  }
}

// Function to get all MDX files from a directory
export async function getAllMDXFiles(directory) {
  const fullPath = path.join(process.cwd(), directory);
  
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(fullPath);
  const mdxFiles = files.filter(file => file.endsWith('.mdx'));

  const allContent = await Promise.all(
    mdxFiles.map(async (file) => {
      const filePath = path.join(directory, file);
      const content = await getMDXContent(filePath);
      if (!content) return null;

      const slug = file.replace(/\.mdx$/, '');
      return {
        slug,
        ...content.frontmatter,
        content: content.content,
      };
    })
  );

  return allContent.filter(Boolean);
}

// Function to get a single MDX file by slug
export async function getMDXFileBySlug(directory, slug) {
  const filePath = path.join(directory, `${slug}.mdx`);
  const content = await getMDXContent(filePath);
  
  if (!content) return null;

  return {
    slug,
    ...content.frontmatter,
    content: content.content,
  };
} 