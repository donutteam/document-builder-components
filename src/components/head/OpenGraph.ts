//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Component
//

export interface OpenGraphOptions
{
	/** An audio file that complements this page. */
	audio? : string | OpenGraphAudioOptions;

	/** A one to two sentence description of the page. */
	description? : string;

	/** The word that appears before this page's title in a sentence. */
	determiner? : "a" | "an" | "the" | "" | "auto";

	/** An image that URL that represents the page. */
	image : string | OpenGraphImageOrVideoOptions;

	/** The locale these tags are marked up in. Of the format language_TERRITORY. Default is en_US. */
	locale? : string;

	/** Alternate locales the page is available in. */
	localeAlternates? : string[];

	/** The name of the website. */
	siteName? : string;

	/** The title of the page. */
	title : string;

	/** The type of content on the page. Optional, defaults to "website". */
	type? : OpenGraphType;

	/** A video file that complements this page. */
	video? : string | OpenGraphImageOrVideoOptions;
}

export interface OpenGraphAudioOptions
{
	/** The URL to the audio. */
	url : string;

	/** A secure URL to the audio. */
	secureUrl? : string;

	/** A MIME type for the audio. */
	type? : "audio/wav" | "audio/mpeg" | "audio/mp4" | "audio/aac" | "audio/aacp" | "audio/ogg" | "audio/webm" | "audio/flac";
}

export interface OpenGraphImageOrVideoOptions
{
	/** The URL to the image or video. */
	url : string;

	/** A secure URL to the image or video. */
	secureUrl? : string;

	/** A MIME type for the image or video. */
	type? : "image/avif" | "image/jpeg" | "image/png" | "image/svg+xml" | "image/webp" | "video/mp4" | "video/webm";

	/** The width of the image or video in pixels. */
	width? : number;

	/** The height of the image or video in pixels. */
	height? : number;

	/** The alt text for the image or video. */
	alt? : string;
}

export type OpenGraphType = "music.song" | "music.album" | "music.playlist" | "music.radio_station" | "video.movie"
	| "video.episode" | "video.tv_show" | "video.other" | "article" | "book" | "profile" | "website";

export function OpenGraph(options : OpenGraphOptions) : Child[]
{
	//
	// Build Properties
	//

	const elements : Child[] = [];

	// Audio
	if (options.audio)
	{
		elements.push(OpenGraphAudio(options.audio));
	}

	// Description
	if (options.description)
	{
		elements.push(OpenGraphProperty("description", options.description));
	}

	// Determiner
	elements.push(OpenGraphProperty("determiner", options.determiner ?? ""));

	// Image
	elements.push(OpenGraphImageOrVideo("image", options.image, options.title));

	// Locales
	elements.push(OpenGraphProperty("locale", options.locale ?? "en_US"));

	if (options.localeAlternates != null)
	{
		for (const locale of options.localeAlternates)
		{
			elements.push(OpenGraphProperty("locale:alternate", locale));
		}
	}

	// Site Name
	if (options.siteName != null)
	{
		elements.push(OpenGraphProperty("site_name", options.siteName));
	}

	// Title
	elements.push(OpenGraphProperty("title", options.title));

	// Type
	elements.push(OpenGraphProperty("type", options.type ?? "website"));

	// Video
	if (options.video != null)
	{
		elements.push(OpenGraphImageOrVideo("video", options.video, options.title));
	}

	//
	// Return Properties
	//

	return elements;
}

export function OpenGraphAudio(audio : string | OpenGraphAudioOptions) : Child
{
	if (typeof audio == "string")
	{
		return OpenGraphProperty("audio", audio);
	}

	const properties = [];

	properties.push(OpenGraphProperty("audio", audio.url));

	if (typeof (audio) == "object")
	{
		if (audio.secureUrl != null)
		{
			properties.push(OpenGraphProperty("audio:secure_url", audio.secureUrl));
		}

		if (audio.type != null)
		{
			properties.push(OpenGraphProperty("audio:type", audio.type));
		}
	}

	return properties;
}

export function OpenGraphImageOrVideo(type : "image" | "video", imageOrVideo : string | OpenGraphImageOrVideoOptions, title : string) : Child
{
	if (typeof imageOrVideo == "string")
	{
		return OpenGraphProperty(type, imageOrVideo);
	}

	const properties = [];

	if (imageOrVideo.url != null)
	{
		properties.push(OpenGraphProperty(type + ":url", imageOrVideo.url));
	}

	if (imageOrVideo.secureUrl != null)
	{
		properties.push(OpenGraphProperty(type + ":secure_url", imageOrVideo.secureUrl));
	}

	if (imageOrVideo.type != null)
	{
		properties.push(OpenGraphProperty(type + ":type", imageOrVideo.type));
	}

	if (imageOrVideo.width != null)
	{
		properties.push(OpenGraphProperty(type + ":width", imageOrVideo.width.toString()));
	}

	if (imageOrVideo.height != null)
	{
		properties.push(OpenGraphProperty(type + ":height", imageOrVideo.height.toString()));
	}

	if (imageOrVideo.alt != null)
	{
		properties.push(OpenGraphProperty(type + ":alt", imageOrVideo.alt));
	}
	else
	{
		properties.push(OpenGraphProperty(type + ":alt", `${ title } image`));
	}

	return properties;
}

export function OpenGraphProperty(name : string, content : string) : DE
{
	return new DE("meta",
		{
			property: "og:" + name,
			content: content,
		});
}