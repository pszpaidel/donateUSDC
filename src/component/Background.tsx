type Props = {
  children?: React.ReactNode;
};

export const Background = ({ children }: Props) => (
  <div className="ghibli-background">
    <div className="wind-effect"></div>
    <div className="floating-elements">
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
    </div>
    <div className="magical-particles">
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
    </div>
    {children}
  </div>
);
