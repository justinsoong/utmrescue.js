# utmrescue.js

UtmRescue is a lightweight TypeScript/JavaScript library for capturing, storing, and retrieving UTM parameters in browser environments. It maintains first-party attribution while allowing for the addition of new UTM parameters.

## Features

- Extracts UTM parameters from URLs
- Stores UTM parameters in cookies on the parent domain
- Maintains first-party attribution (doesn't overwrite existing UTM parameters)
- Case-insensitive parameter handling
- Works across subdomains
- Easy to integrate into any web project

## Installation

You can install UtmRescue via npm:

```bash
npm install utmrescue
```

Or include it directly in your HTML using a CDN:

```html
<script src="https://unpkg.com/utmrescue/dist/utmrescue.min.js"></script>
```

## Usage

### In a TypeScript/JavaScript project

```typescript
import UtmRescue from "utmrescue";

// Initialize UtmRescue
const utmRescue = new UtmRescue();

// Get UTM parameters
const utmParams = utmRescue.getUtmParams();
console.log(utmParams);
```

### In an HTML file

```html
<!doctype html>
<html lang="en">
  <head>
    <script src="https://unpkg.com/utmrescue/dist/utmrescue.min.js"></script>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        // Initialize UtmRescue
        var utmRescue = new UtmRescue.default();

        // Get UTM parameters
        var utmParams = utmRescue.getUtmParams();
      });
    </script>
  </head>
  <body>
    <!-- Your content here -->
  </body>
</html>
```

## How It Works

1. When initialized, UtmRescue checks the current URL for UTM parameters.
2. It also checks for previously stored UTM parameters in cookies.
3. If a UTM parameter exists in the URL and is not already stored, it's captured.
4. If a UTM parameter is already stored, the stored value is kept (maintaining first-party attribution).
5. The combined set of UTM parameters (stored + new) is saved in a cookie on the parent domain.
6. You can retrieve the current set of UTM parameters at any time using `getUtmParams()`.

## API

### Constructor

```typescript
new UtmRescue();
```

Creates a new instance of UtmRescue, automatically extracting and storing UTM parameters.

### Methods

#### getUtmParams()

```typescript
utmRescue.getUtmParams(): { [key: string]: string }
```

Returns an object containing the current UTM parameters. This includes both stored parameters and any new parameters from the current URL.

## Supported UTM Parameters

UtmRescue supports the following UTM parameters:

- utm_source
- utm_medium
- utm_campaign
- utm_term
- utm_content

All parameters are stored and returned in lowercase for consistency.

## Browser Compatibility

UtmRescue is compatible with all modern browsers that support ES5 and cookies.

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any problems or have any questions, please open an issue on the GitHub repository.
