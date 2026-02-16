import { Circle, Path, Svg } from "react-native-svg";

interface GoogleIconProps {
  size?: number;
}

export function GoogleIcon({ size = 24 }: GoogleIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="10" fill="red" />
      <Path
        d="M12 6.5c1.9 0 3.5.7 4.8 1.8l-1.8 1.8c-.8-.7-1.8-1.1-3-1.1-2.3 0-4.2 1.9-4.2 4.2s1.9 4.2 4.2 4.2c2.1 0 3.6-1.4 3.9-3.2H12v-2.1h6.3c.1.4.1.9.1 1.4 0 3.6-2.6 6.2-6.4 6.2-3.7 0-6.7-3-6.7-6.7S8.3 6.5 12 6.5z"
        fill="white"
      />
    </Svg>
  );
}
