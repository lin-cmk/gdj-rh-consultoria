import React from "react";

const SectionTitle = ({
  children,
  subtitle,
  sectionClasses = "",
  titleClasses = "",
  subtitleClasses = "",
  align = "center",
}) => {
  return (
    <div className={`section-title mb-10 ${align === "center" ? "text-center" : "text-left"} ${sectionClasses}`}>
      <h2 className={`text-3xl md:text-4xl font-bold text-verde-profundo ${titleClasses}`}>
        {children}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-verde-musgo max-w-2xl mx-auto ${subtitleClasses}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
