import styles from './styles.module.scss';

const Loader = ({ width = 192, height = 192 }) => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192 192"
          width={width}
          height={height}
          preserveAspectRatio="xMidYMid meet"
          style={{ width: "100%", height: "100%", transform: "translate3d(0px, 0px, 0px)", contentVisibility: "visible" }}
          >
          <defs>
            <clipPath id="clipPath">
              <rect width="192" height="192" x="0" y="0" />
            </clipPath>
          </defs>
          <g clipPath="url(#clipPath)">
            <g transform="translate(44.334,42.194)" opacity="1">
              <g opacity="1" transform="translate(51.667,53.807)">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  stroke="#613ff6f6"
                  strokeWidth="10.333"
                  d="M36.167,46.5H-36.167V-46.5H36.167V46.5Z"
                  />
              </g>
              <g opacity="1">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  stroke="#613ff6f6"
                  strokeWidth="10.333"
                  d="M98.166,100.307H5.166"
                  />
              </g>
              <g opacity="1" transform="translate(51.666,84.807)">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  stroke="#613ff6f6"
                  strokeWidth="10.333"
                  d="M10.333,15.5V-15.5H-10.333V15.5"
                  />
              </g>
              <g opacity="1">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  stroke="#613ff6f6"
                  strokeWidth="10.333"
                  d="M41.333,48.64H36.166"
                  />
              </g>
              <g opacity="1">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  stroke="#613ff6f6"
                  strokeWidth="10.333"
                  d="M41.333,27.973H36.166"
                  />
              </g>
              <g opacity="1">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  stroke="#613ff6f6"
                  strokeWidth="10.333"
                  d="M67.166,27.973H61.999"
                  />
              </g>
              <g opacity="1">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  stroke="#613ff6f6"
                  strokeWidth="10.333"
                  d="M67.166,48.64H61.999"
                  />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Loader;