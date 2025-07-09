function extractPersianText(text) {
  const match = text.match(/[\u0600-\u06FF0-9‌،.؟"'\s«»٪()-]+/);
  return match ? match[0].trim().replace(/^[:\s‌]+/, "") : "";
}
