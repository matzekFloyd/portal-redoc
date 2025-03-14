import * as React from "react";
import { createRoot } from "react-dom/client";
import type { RedocRawOptions } from "../../src";
import { RedocStandalone } from "../../src";

const userUrl = window.location.search.match(/url=(.*)$/);

const specUrl = (userUrl && userUrl[1]) || "eva_openapi.json";

const options: RedocRawOptions = { nativeScrollbars: false, maxDisplayedEnumValues: 3 };

const container = document.getElementById("example");
const root = createRoot(container!);
root.render(<RedocStandalone specUrl={specUrl} options={options} />);
