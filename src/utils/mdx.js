import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

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

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    console.log('File contents loaded, length:', fileContents.length);
    
    // Process includes before parsing frontmatter
    const processedContent = processMDXIncludes(fileContents, fullPath);
    
    // Parse frontmatter and content
    const { data, content } = matter(processedContent);
    console.log('Frontmatter parsed:', data);
    
    // Serialize the MDX content
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrism, { ignoreMissing: true }]],
        format: 'mdx',
      },
      parseFrontmatter: true,
    });

    console.log('MDX content serialized successfully');
    console.log('Content type:', typeof mdxSource);
    console.log('Content preview:', mdxSource.substring(0, 100));

    return {
      frontmatter: data,
      content: mdxSource,
    };
  } catch (error) {
    console.error(`Error processing MDX file ${filePath}:`, error);
    console.error('Error stack:', error.stack);
    return null;
  }
}

// Function to get all MDX files from a directory
export async function getAllMDXFiles(directory) {
  try {
    const fullPath = path.join(process.cwd(), directory);
    console.log('Reading directory:', fullPath);
    
    if (!fs.existsSync(fullPath)) {
      console.error(`Directory not found: ${fullPath}`);
      return [];
    }

    const files = fs.readdirSync(fullPath);
    console.log('Found files:', files);
    
    const mdxFiles = await Promise.all(
      files
        .filter((file) => file.endsWith('.mdx'))
        .map(async (file) => {
          const filePath = path.join(directory, file);
          const result = await getMDXContent(filePath);
          
          if (!result) {
            return null;
          }

          return {
            ...result.frontmatter,
            slug: file.replace(/\.mdx$/, ''),
            content: result.content,
          };
        })
    );

    return mdxFiles.filter(Boolean).sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error(`Error getting MDX files from ${directory}:`, error);
    return [];
  }
} 