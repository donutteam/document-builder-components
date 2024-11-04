//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Component
//

export type OpenGraphType = "music.song" | "music.album" | "music.playlist" | "music.radio_station" | "video.movie" | "video.episode" | "video.tv_show" | "video.other" | "article" | "book" | "profile" | "website";

export type OpenGraphOptions =
{
	audio?: string | OpenGraphAudioOptions;
	description?: string;
	determiner?: "a" | "an" | "the" | "" | "auto";
	image: string | OpenGraphImageOrVideoOptions;
	locale?: string;
	localeAlternates?: string[];
	siteName?: string;
	title: string;
	type?: OpenGraphType;
	video?: string | OpenGraphImageOrVideoOptions;
};

export function OpenGraph(options: OpenGraphOptions)
{
	//
	// Build Properties
	//

	const elements: Child[] = [];

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

export type OpenGraphAudioOptions =
{
	url: string;
	secureUrl?: string;
	type?: "audio/wav" | "audio/mpeg" | "audio/mp4" | "audio/aac" | "audio/aacp" | "audio/ogg" | "audio/webm" | "audio/flac";
};

export function OpenGraphAudio(audio: string | OpenGraphAudioOptions)
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

export type OpenGraphImageOrVideoOptions =
{
	url: string;
	secureUrl?: string;
	type?: "image/avif" | "image/jpeg" | "image/png" | "image/svg+xml" | "image/webp" | "video/mp4" | "video/webm";
	width?: number;
	height?: number;
	alt? : string;
};

export function OpenGraphImageOrVideo(type: "image" | "video", imageOrVideo: string | OpenGraphImageOrVideoOptions, title: string)
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

export function OpenGraphProperty(name: string, content: string)
{
	return new DE("meta",
		{
			property: "og:" + name,
			content: content,
		});
}