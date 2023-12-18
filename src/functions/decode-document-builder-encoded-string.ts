//
// Function
//

/** Decodes a document builder component encoded string. */
function decodeDocumentBuilderEncodedString(encodedString : string) : string
{
	return encodedString.replace(/&lt;|&gt;|&amp;|&quot;|&apos;/g, (entity) =>
	{
		switch (entity)
		{
			case "&lt;":
				return "<";

			case "&gt;":
				return ">";

			case "&amp;":
				return "&";

			case "&quot;":
				return "\"";

			case "&apos;":
				return "'";

			default:
				return entity;
		}
	});
}
