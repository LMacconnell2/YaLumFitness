import Ajv from "ajv";
import addFormats from "ajv-formats";
import addKeywords from "ajv-keywords";
import type { JSONSchema7 } from "json-schema"; // ← add this import

// export function validator(schema: JSONSchema7, data: unknown) {
//     const ajv = new Ajv();
//     addFormats(ajv);
//     addKeywords(ajv, "instanceof");
//     const validate = ajv.compile(schema);
//     if (!validate(data)) {
//         if (validate.errors) {
//             const message = validate.errors
//                 .map((error) => error.instancePath + " " + error.message)
//                 .join(", ");
//             throw new Error(message);
//         }
//     }
// }